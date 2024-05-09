import React, { useEffect, useMemo, useRef } from "react";
import { TreeParsedItem } from "../parser";
import TreeItem, { ITreeItemRef } from "../TreeItem";

interface ITreeListProps {
    tree: TreeParsedItem[];
    ids: string[],
    selectedAssetId?: string;
}

const TreeList: React.FC<ITreeListProps> = (({ tree, ids, selectedAssetId }: ITreeListProps) => {
    const lastRef = useRef<ITreeItemRef | null>(null);
    const refPerId = useMemo(() => {
        const refPerId: Record<string, React.RefObject<ITreeItemRef>> = {};

        ids.forEach(id => {
            refPerId[id] = React.createRef();
        });

        return refPerId;
    }, [ids]);

    const renderItem = (item: TreeParsedItem) => {
        const ref = refPerId[item.data.id];

        return (
            <TreeItem item={item} key={item.data.id} ref={ref}>
                {item.children.map(renderItem)}
            </TreeItem>
        );
    };

    useEffect(() => {
        if (lastRef.current) lastRef.current.setSelected(false);

        if (!selectedAssetId) return;
        if (!(selectedAssetId in refPerId)) return;

        const ref = refPerId[selectedAssetId];
        ref.current?.setSelected(true);
        lastRef.current = ref.current;
    }, [selectedAssetId, refPerId])

    // It is working as expected, no need to add the dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const AllItems = useMemo(() => tree.map(renderItem), [tree])

    return AllItems;
});

export default TreeList;