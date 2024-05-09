import { useStore } from "../../store";
import AssetDetails from "./AssetDetails";
import Filters from "./Filters";
import SearchInput from "./SerachInput";
import TreeView from "./TreeView";
import { CompanyDetailsStyles } from "./styles";


const CompanyDetails: React.FC = () => {
    const { selectedCompany, selectedAsset } = useStore(state => ({
        selectedCompany: state.selectedCompany,
        selectedAsset: state.selectedAsset
    }));

    return (
        <CompanyDetailsStyles.Container>
            {!selectedCompany ? (<p className="select">Please select a company</p>) : (
                <>
                    <CompanyDetailsStyles.Header>
                        <CompanyDetailsStyles.Title>
                            <h1>Actives</h1>
                            <h2>/ {selectedCompany.name}</h2>
                        </CompanyDetailsStyles.Title>
                        <Filters />
                    </CompanyDetailsStyles.Header>
                    <CompanyDetailsStyles.Details>
                        <section className="left">
                            <SearchInput />
                            <TreeView
                                companyId={selectedCompany.id}
                                selectedAssetId={selectedAsset?.id}
                            />
                        </section>
                        <AssetDetails />
                    </CompanyDetailsStyles.Details>
                </>
            )}
        </CompanyDetailsStyles.Container>
    );
};

export default CompanyDetails;