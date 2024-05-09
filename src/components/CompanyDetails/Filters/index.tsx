import store, { useStore } from "../../../store";
import AlertIcon from "./alert.svg?react";
import EnergyIcon from "./energy.svg?react";
import { FiltersStyles } from "./styles";

const Filters: React.FC = () => {
    const { filterCritical, filterEnergy } = useStore(state => ({
        filterCritical: state.filterCritical,
        filterEnergy: state.filterEnergy,
    }))

    return (
        <FiltersStyles.Container>
            <FiltersStyles.Button
                onClick={() => store.setState(state => ({ filterEnergy: !state.filterEnergy }))}
                $selected={filterEnergy}
            >
                <EnergyIcon />
                <span>
                    Energy sensor
                </span>
            </FiltersStyles.Button>
            <FiltersStyles.Button
                onClick={() => store.setState(state => ({ filterCritical: !state.filterCritical }))}
                $selected={filterCritical}
            >
                <AlertIcon />
                <span>
                    Critical
                </span>
            </FiltersStyles.Button>
        </FiltersStyles.Container>
    );
};

export default Filters;