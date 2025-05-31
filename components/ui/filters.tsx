import React from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

type FilterType = "Categoria" | "Modalidad" | "Precio" | "Fecha" | "TipoEvento";

interface Filter {
  key: FilterType;
  label: string;
  options: any[];
  type: "checkbox" | "radio" | "price" | "range" | "date";
}

interface Props {
  openFilter: string | null;
  setOpenFilter: (key: string | null) => void;
  categoriasSeleccionadas: string[];
  setCategoriasSeleccionadas: (cats: string[]) => void; 
  modalidad: string;
  setModalidad: (m: string) => void;
  precioSeleccionado: { min: number; max: number | null };
  setPrecioSeleccionado: (p: { min: number; max: number | null }) => void;
  precioMin: string;
  setPrecioMin: (v: string) => void;
  precioMax: string;
  setPrecioMax: (v: string) => void;
  fechaInicio: string;
  setFechaInicio: (v: string) => void;
  fechaFin: string;
  setFechaFin: (v: string) => void;
  tiposEventoSeleccionados: string[];
  setTiposEventoSeleccionados: (v: string[]) => void;
  filters: Filter[];
}

export const EventFilters: React.FC<Props> = ({
  openFilter,
  setOpenFilter,
  categoriasSeleccionadas,
  setCategoriasSeleccionadas,
  modalidad,
  setModalidad,
  precioSeleccionado,
  setPrecioSeleccionado,
  precioMin,
  setPrecioMin,
  precioMax,
  setPrecioMax,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  tiposEventoSeleccionados,
  setTiposEventoSeleccionados,
  filters,
}) => {
  const precioMaxRange = 1000;

  return (
    <div className="w-full space-y-3 bg-white p-4 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-4">Filtros</h3>
    {filters.map((filter) => (
        <div key={filter.key} className="rounded-lg shadow border border-border">
          <button
            className={`
              w-full flex justify-between items-center px-4 py-3 font-semibold
              transition-colors rounded-lg
              ${openFilter === filter.key
                ? "bg-red-600 text-white"
                : "bg-white text-black hover:bg-red-100"}
            `}
            onClick={() =>
              setOpenFilter(openFilter === filter.key ? null : filter.key)
            }
          >
            {filter.label}
          </button>
          <div
            className={`
              transition-all duration-300 overflow-hidden
              ${openFilter === filter.key ? "max-h-96 py-2 px-4" : "max-h-0 py-0 px-4"}
              bg-white
            `}
          >
            {openFilter === filter.key && (
              filter.type === "checkbox" ? (
                // ✅ Cambio: usar filter.type en lugar de filter.key
                <div className="divide-y divide-gray-200">
                  {filter.options.map((option: string) => {

                  // Diferenciar entre categorías y tipos de evento
                  let selected = false;
                  let onChangeHandler = () => {};

                    if (filter.key === "Categoria") {
                      selected = categoriasSeleccionadas.includes(option);
                      onChangeHandler = () => {
                        setCategoriasSeleccionadas(
                          selected
                            ? categoriasSeleccionadas.filter((c) => c !== option)
                            : [...categoriasSeleccionadas, option]
                        );
                      };
                    } else if (filter.key === "TipoEvento") {
                      selected = tiposEventoSeleccionados.includes(option);
                      onChangeHandler = () => {
                        setTiposEventoSeleccionados(
                          selected
                            ? tiposEventoSeleccionados.filter((t) => t !== option)
                            : [...tiposEventoSeleccionados, option]
                        );
                      };
                    } else {
                      selected = false;
                      onChangeHandler = () => {};
                    }

                    return (
                      <label
                        key={option}
                        className={`
                          flex items-center gap-3 py-3 px-2 cursor-pointer transition
                          ${selected ? "bg-red-50" : "bg-white hover:bg-gray-50"}
                        `}
                      >
                        <input
                          type="checkbox"
                          name={filter.key}
                          value={option}
                          checked={selected}
                          onChange={onChangeHandler}
                          className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-red-500 transition-all"/>
                        <span className="text-base text-gray-800 capitalize">{option}</span>
                      </label>
                    );
                  })}
                </div>
              ) : filter.type === "radio" ? (
                // ✅ Cambio: usar filter.type en lugar de filter.key
                <div className="flex flex-col gap-3 mt-2">
                  {filter.options.map((option: string) => ( // ✅ Cambio: string en lugar de Modalidad
                    <label key={option} className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="radio"
                        name={filter.key}
                        value={option}
                        checked={modalidad === option}
                        onChange={() => setModalidad(option)}
                        className="w-5 h-5 rounded-full border border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-base text-gray-900 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              ) : filter.type === "range" ? (
                <div className="flex flex-col gap-4 p-4">
                  {/* Mostrar valores actuales */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rango de precio</span>
                    <span className="text-sm text-gray-600">
                      ${precioSeleccionado.min} - ${precioSeleccionado.max || precioMaxRange}
                    </span>
                  </div>
              
                  {/* ✅ Range Slider que funciona correctamente */}
                  <div className="px-2">
                    <RangeSlider
                      min={0}
                      max={precioMaxRange}
                      step={10}
                      value={[precioSeleccionado.min, precioSeleccionado.max || precioMaxRange]}
                      onInput={(values) => {
                        setPrecioSeleccionado({
                          min: values[0],
                          max: values[1]
                        });
                        setPrecioMin(values[0].toString());
                        setPrecioMax(values[1].toString());
                      }}
                      className="range-slider-red"
                    />
                  </div>
              
                  {/* ✅ Inputs personalizados con validación */}
                  <div className="space-y-3">
                    <span className="text-xs font-medium text-gray-600">Personalizado:</span>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Mínimo</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input
                            type="number"
                            placeholder="0"
                            min="0"
                            max={precioSeleccionado.max || precioMaxRange}
                            className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={precioMin}
                            onChange={(e) => {
                              const value = e.target.value;
                              const numValue = Number(value);
                              
                              if (value === '' || (numValue >= 0 && numValue <= (precioSeleccionado.max || precioMaxRange))) {
                                setPrecioMin(value);
                                if (value !== '') {
                                  setPrecioSeleccionado({
                                    min: numValue,
                                    max: precioSeleccionado.max
                                  });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center pt-6">
                        <span className="text-gray-400">-</span>
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Máximo</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input
                            type="number"
                            placeholder={precioMaxRange.toString()}
                            min={precioSeleccionado.min}
                            max={precioMaxRange}
                            className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={precioMax}
                            onChange={(e) => {
                              const value = e.target.value;
                              const numValue = Number(value);
                              
                              if (value === '' || (numValue >= precioSeleccionado.min && numValue <= precioMaxRange)) {
                                setPrecioMax(value);
                                if (value !== '') {
                                  setPrecioSeleccionado({
                                    min: precioSeleccionado.min,
                                    max: numValue
                                  });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
              
                  {/* Botón reset */}
                  <button
                    className="self-start text-xs text-red-600 hover:text-red-800 underline transition-colors"
                    onClick={() => {
                      setPrecioMin("");
                      setPrecioMax("");
                      setPrecioSeleccionado({ min: 0, max: null });
                    }}
                    type="button"
                  >
                    Limpiar filtros de precio
                  </button>
                </div>
              ) : filter.type === "price" ? (
                // ✅ Cambio: usar filter.type en lugar de filter.key
                <div className="flex flex-col gap-2">
                  {filter.options.map((option: any) => (
                    <label key={option.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="precio"
                        checked={
                          precioSeleccionado.min === option.min &&
                          precioSeleccionado.max === option.max
                        }
                        onChange={() => {
                          setPrecioSeleccionado({ min: option.min, max: option.max });
                          setPrecioMin(option.min !== 0 ? option.min : "");
                          setPrecioMax(option.max !== null ? option.max : "");
                        }}
                        className="accent-red-600"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <span>Personalizado:</span>
                    <input
                      type="number"
                      placeholder="Mín"
                      className="w-20 border rounded p-1"
                      value={precioMin}
                      onChange={(e) => {
                        setPrecioMin(e.target.value);
                        setPrecioSeleccionado({
                          min: Number(e.target.value),
                          max: precioSeleccionado.max,
                        });
                      }}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Máx"
                      className="w-20 border rounded p-1"
                      value={precioMax}
                      onChange={(e) => {
                        setPrecioMax(e.target.value);
                        setPrecioSeleccionado({
                          min: precioSeleccionado.min,
                          max: Number(e.target.value),
                        });
                      }}
                    />
                    <button
                      className="ml-2 text-xs underline text-red-600"
                      onClick={() => {
                        setPrecioMin("");
                        setPrecioMax("");
                        setPrecioSeleccionado({ min: 0, max: null });
                      }}
                      type="button"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              ) : filter.type === "date" ? (
                <div className="flex flex-col gap-2 p-2">
                  <label className="text-xs text-gray-600">Fecha inicio</label>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <label className="text-xs text-gray-600">Fecha fin</label>
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={e => setFechaFin(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
