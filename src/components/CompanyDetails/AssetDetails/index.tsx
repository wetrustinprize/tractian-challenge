import { useStore } from "../../../store";
import { LoadingLabel } from "../../LoadingLabel";
import { AssetDetailsStyles } from "./styles";


const AssetDetails: React.FC = () => {
    const selectedAsset = useStore(state => state.selectedAsset);

    return (
        <AssetDetailsStyles.Container>
            {!selectedAsset ? <LoadingLabel>Select an asset</LoadingLabel> : JSON.stringify(selectedAsset, null, 2)}
        </AssetDetailsStyles.Container>
    );
};

export default AssetDetails;