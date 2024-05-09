import { TreeParsedItem, isParsedAsset } from "../parser";

import LocationIcon from "./location.svg?react";
import AssetIcon from "./asset.svg?react";
import ComponentIcon from "./component.svg?react";

import OperatingIcon from "./operating.svg?react";
import AlertIcon from "./alert.svg?react";
import EnergyIcon from "./energy.svg?react";

import { TreeItemStyles } from "./styles";
import store from "../../../../store";
import React, { useImperativeHandle, useState } from "react";

interface ITreeItemProps {
    item: TreeParsedItem;
    children?: React.ReactNode;
}

export interface ITreeItemRef {
    setSelected: (selected: boolean) => void;
}

const TreeItem = React.forwardRef<ITreeItemRef, ITreeItemProps>(({ item, children }: ITreeItemProps, ref) => {
    const [selected, setSelected] = useState<boolean>(false);
    const isAsset = isParsedAsset(item);

    useImperativeHandle(ref, () => ({
        setSelected: (selected: boolean) => setSelected(selected)
    }), []);

    const handleOnClick = () => {
        if (!isAsset) return;

        store.setState({ selectedAsset: item.data });
    }

    return (
        <TreeItemStyles.Container>
            <TreeItemStyles.Data
                onClick={handleOnClick}
                $clickable={isAsset}
                $selected={isAsset && selected}
            >
                {!isAsset ? <LocationIcon /> : (item.type === 'asset' ? <AssetIcon /> : <ComponentIcon />)}
                {item.data.name}
                {isAsset && item.data.status === 'alert' && <AlertIcon />}
                {isAsset && item.data.status === 'operating' && <OperatingIcon />}
                {isAsset && item.data.sensorType === 'energy' && <EnergyIcon />}
            </TreeItemStyles.Data>
            <TreeItemStyles.ChildrenContainer>
                {children}
            </TreeItemStyles.ChildrenContainer>
        </TreeItemStyles.Container>
    );
});

export default TreeItem;