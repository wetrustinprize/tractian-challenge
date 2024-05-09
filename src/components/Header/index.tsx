import { HeaderStyles } from "./styles";

import Logo from "./logo.svg?react";
import CompanyIcon from "./company.svg?react";

import useCompaniesQuery from "../../queries/useCompaniesQuery";
import { ErrorLabel } from "../ErrorLabel";
import { LoadingLabel } from "../LoadingLabel";
import store, { useStore } from "../../store";
import { ICompany } from "../../interfaces/ICompany";

const Header: React.FC = () => {
    const selectedCompany = useStore(state => state.selectedCompany);
    const { data, isFetching, isError } = useCompaniesQuery();

    const handleSelectCompany = (company: ICompany) => store.setState({ selectedCompany: company, selectedAsset: undefined });

    return (
        <HeaderStyles.Container>
            <section className="left">
                <Logo />
            </section>
            <section className="middle" />
            <section className="right">
                {isFetching && <LoadingLabel>Please wait, fetching companies...</LoadingLabel>}
                {isError && <ErrorLabel>Error fetching the companies.</ErrorLabel>}
                {data &&
                    <HeaderStyles.Companies>
                        {data.map(company => (
                            <HeaderStyles.CompanyButton
                                key={company.id}
                                onClick={() => handleSelectCompany(company)}
                                $selected={selectedCompany?.id === company.id}
                            >
                                <CompanyIcon />
                                {company.name}
                            </HeaderStyles.CompanyButton>))}
                    </HeaderStyles.Companies>
                }
            </section>
        </HeaderStyles.Container>
    );
};

export default Header;