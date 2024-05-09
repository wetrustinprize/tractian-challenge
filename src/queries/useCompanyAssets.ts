import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { IAsset } from "../interfaces/IAsset";

const useCompanyAssets = (companyId: string) => useQuery({
    queryKey: ["companyAssets", companyId],
    queryFn: async () => {
        return (await api.get<IAsset[]>(`/companies/${companyId}/assets`)).data;
    },
});

export default useCompanyAssets;