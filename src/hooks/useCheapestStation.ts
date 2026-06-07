import { getDistanceKm } from "@/apis/utils";
import { useMemo } from "react";

interface CheapestStationResult {
    station: any | null;
    error: string | null;
}

export const useCheapestStation = (
    stations: any[],
    userLocation: [number, number] | null,
    radius: number,
    selectedFuelType: string,
    filterRotulo: string = "",
): CheapestStationResult => {
    return useMemo(() => {
        if (
            !userLocation ||
            !selectedFuelType ||
            !stations ||
            stations.length === 0
        ) {
            return { station: null, error: null };
        }

        try {
            const stationsInRadius = stations.filter((station) => {
                const lat = parseFloat(station["Latitud"].replace(",", "."));
                const lon = parseFloat(
                    station["Longitud (WGS84)"].replace(",", "."),
                );
                const distance = getDistanceKm(
                    userLocation[0],
                    userLocation[1],
                    lat,
                    lon,
                );
                const matchRotulo = station["Rótulo"]
                    .toLowerCase()
                    .includes(filterRotulo.toLowerCase());
                return distance <= radius && matchRotulo;
            });

            if (stationsInRadius.length === 0) {
                return {
                    station: null,
                    error: "No hay estaciones en este radio",
                };
            }

            const stationsWithPrice = stationsInRadius.filter((station) => {
                const price = station[selectedFuelType];
                return price && price !== "-" && price !== "";
            });

            if (stationsWithPrice.length === 0) {
                return {
                    station: null,
                    error: `No hay datos de ${selectedFuelType} en este radio`,
                };
            }

            const cheapestStation = stationsWithPrice.reduce(
                (prev, current) => {
                    const prevPrice =
                        parseFloat(
                            (prev[selectedFuelType] || "0").replace(",", "."),
                        ) || Infinity;
                    const currentPrice =
                        parseFloat(
                            (current[selectedFuelType] || "0").replace(
                                ",",
                                ".",
                            ),
                        ) || Infinity;
                    return currentPrice < prevPrice ? current : prev;
                },
            );

            return { station: cheapestStation, error: null };
        } catch (error) {
            return {
                station: null,
                error: "Error al buscar la estación más barata",
            };
        }
    }, [stations, userLocation, radius, selectedFuelType, filterRotulo]);
};
