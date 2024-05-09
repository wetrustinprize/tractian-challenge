import { useQuery } from "@tanstack/react-query";
import { ILocation } from "../interfaces/ILocation";
import api from "../api";

const useCompanyLocations = (companyId: string) => useQuery({
    queryKey: ["companyLocations", companyId],
    queryFn: async () => {
        return (await api.get<ILocation[]>(`/companies/${companyId}/locations`)).data;
    },
});

export default useCompanyLocations;