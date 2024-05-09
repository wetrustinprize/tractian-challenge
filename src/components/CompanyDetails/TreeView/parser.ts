import { IAsset } from "../../../interfaces/IAsset";
import { ILocation } from "../../../interfaces/ILocation";

export interface IParsedAsset {
    data: IAsset;
    type: 'component' | 'asset';
    children: TreeParsedItem[];
}

export interface IParsedLocation {
    data: ILocation;
    children: TreeParsedItem[];
}

export const isParsedAsset = (item: TreeParsedItem): item is IParsedAsset => "type" in item;

export type TreeParsedItem = (IParsedAsset | IParsedLocation);

export const assetsAndLocationsIds = (assets: IAsset[], locations: ILocation[]): string[] => {
    return [
        ...assets.map(asset => asset.id),
        ...locations.map(location => location.id)
    ];
}

export const assetsAndLocationToTree = (
    assets: IAsset[],
    locations: ILocation[],
    filterOptions?: { searchParams?: string, filterEnergy?: boolean, filterCritical?: boolean }
): TreeParsedItem[] => {
    let dontDestroyIds: string[] | undefined = undefined;

    if (filterOptions) {
        dontDestroyIds = [];

        assets.forEach(ass => {
            const passSearchParam = filterOptions.searchParams ?
                ass.name.toLowerCase().includes(filterOptions.searchParams.toLowerCase()) :
                true;

            const passFilterEnergy = filterOptions.filterEnergy ?
                ass.sensorType === "energy" :
                true;

            const passFilterCritical = filterOptions.filterCritical ?
                ass.status === "alert" :
                true;

            const passAll = passSearchParam && passFilterEnergy && passFilterCritical;

            if (passAll) {
                dontDestroyIds!.push(ass.id);

                if (ass.parentId) dontDestroyIds!.push(ass.parentId);
            }
        })
    }

    const filteredAssets = dontDestroyIds ? assets.filter(asset => dontDestroyIds.includes(asset.id)) : assets;

    const tree: TreeParsedItem[] = [];

    const locationsMap: Map<string, IParsedLocation> = new Map();
    const assetsMap: Map<string, IParsedAsset> = new Map();

    locations
        .forEach(location => {
            const treeItem: IParsedLocation = {
                data: location,
                children: [],
            };

            locationsMap.set(treeItem.data.id, treeItem);
        })

    locations
        .forEach(location => {
            const locationInMap: IParsedLocation = locationsMap.get(location.id!)!;

            if (location.parentId === null) {
                tree.push(locationInMap);
                return;
            }

            const parent = locationsMap.get(location.parentId!);

            if (!parent) {
                console.warn("Parent location not found for Location id: " + location.id);
                return;
            }

            parent.children.push(locationInMap as IParsedLocation);
        });

    filteredAssets
        .forEach(asset => {
            const treeItem: IParsedAsset = {
                data: asset,
                type: asset.sensorType !== null ? 'asset' : 'component',
                children: []
            }

            assetsMap.set(treeItem.data.id, treeItem);
        })

    filteredAssets
        .forEach(asset => {
            const assetInMap: IParsedAsset = assetsMap.get(asset.id!)!;

            if (asset.parentId === null && asset.locationId === null) {
                tree.push(assetInMap);
                return;
            }

            const parent = asset.locationId !== null ? locationsMap.get(asset.locationId!) : assetsMap.get(asset.parentId!);

            if (!parent) {
                console.warn("Parent not found for Asset id: " + asset.id);
                return;
            }

            parent.children.push(assetInMap as IParsedAsset);
        })

    return tree;
}