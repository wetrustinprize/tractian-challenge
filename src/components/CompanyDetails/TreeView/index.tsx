import { useMemo } from "react";
import { assetsAndLocationToTree, assetsAndLocationsIds } from "./parser";
import useCompanyLocations from "../../../queries/useCompanyLocations";
import useCompanyAssets from "../../../queries/useCompanyAssets";
import { ErrorLabel } from "../../ErrorLabel";
import { LoadingLabel } from "../../LoadingLabel";
import { TreeViewStyles } from "./styles";
import TreeList from "./TreeList";
import { useStore } from "../../../store";

interface ITreeViewProps {
    companyId: string;
    selectedAssetId?: string;
}

const TreeView: React.FC<ITreeViewProps> = ({ companyId, selectedAssetId }: ITreeViewProps) => {
    const { data: locations, isFetching: fetchingLocations, isError: locationsError } = useCompanyLocations(companyId);
    const { data: assets, isFetching: fetchingAssets, isError: assetsError } = useCompanyAssets(companyId);

    const { searchParams, filterEnergy, filterCritical } = useStore(state => ({
        searchParams: state.searchParams,
        filterEnergy: state.filterEnergy,
        filterCritical: state.filterCritical,
    }))

    const isLoading = fetchingLocations || fetchingAssets;
    const isError = locationsError || assetsError;

    const [tree, ids] = useMemo(() => {
        if (fetchingLocations || fetchingAssets) return [[], []];
        if (!locations && !assets) return [[], []];

        return [
            assetsAndLocationToTree(assets ?? [], locations ?? [], { searchParams, filterCritical, filterEnergy }),
            assetsAndLocationsIds(assets ?? [], locations ?? [])
        ];
    }, [fetchingLocations, fetchingAssets, locations, assets, searchParams, filterCritical, filterEnergy]);


    return (
        <TreeViewStyles.Container>
            {isError && <ErrorLabel>An error occurred.</ErrorLabel>}
            {isLoading && <LoadingLabel>Fetching data...</LoadingLabel>}
            <TreeList tree={tree} ids={ids} selectedAssetId={selectedAssetId} />
        </TreeViewStyles.Container>
    );
};

export default TreeView;