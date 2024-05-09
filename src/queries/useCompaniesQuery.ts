import { useQuery } from "@tanstack/react-query";
import { ICompany } from "../interfaces/ICompany";
import api from "../api";

const useCompaniesQuery = () => useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
        return (await api.get<ICompany[]>("/companies")).data;
    },
});

export default useCompaniesQuery;