import React, { JSX } from "react";
import { FaPaintBrush, FaCode, FaFlask, FaBook } from "react-icons/fa";

type FilterType = "categoria" | "modalidad" | "precio";
type Categoria = "Arte" | "Software" | "Ciencias" | "Educación";
type Modalidad = "Presencial" | "Virtual" | "Híbrido";

interface Filter {
  key: FilterType;
  label: string;
  options: any[];
  type: "checkbox" | "radio" | "price";
}

interface Props {
  openFilter: string | null;
  setOpenFilter: (key: string | null) => void;
  categoriasSeleccionadas: Categoria[];
  setCategoriasSeleccionadas: (cats: Categoria[]) => void;
  modalidad: string;
  setModalidad: (m: string) => void;
  precioSeleccionado: { min: number; max: number | null };
  setPrecioSeleccionado: (p: { min: number; max: number | null }) => void;
  precioMin: string;
  setPrecioMin: (v: string) => void;
  precioMax: string;
  setPrecioMax: (v: string) => void;
  showFilters: boolean;
  filters: Filter[];
}

const categoryIcons: Record<Categoria, JSX.Element> = {
  Arte: <FaPaintBrush className="text-xl text-red-500" />,
  Software: <FaCode className="text-xl text-blue-500" />,
  Ciencias: <FaFlask className="text-xl text-green-500" />,
  Educación: <FaBook className="text-xl text-yellow-500" />,
};

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
  showFilters,
  filters,
}) => {
  if (!showFilters) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
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
              filter.key === "categoria" ? (
                <div className="divide-y divide-gray-200">
                  {filter.options.map((option: Categoria) => {
                    const selected = categoriasSeleccionadas.includes(option);
                    return (
                      <label
                        key={option}
                        className={`
                          flex items-center justify-between gap-4 py-3 px-2 cursor-pointer transition
                          ${selected ? "bg-red-50" : "bg-white hover:bg-gray-50"}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          {categoryIcons[option] !== undefined
                            ? categoryIcons[option]
                            : <span className="w-6" />}
                          <span className="text-base text-gray-800">{option}</span>
                        </div>
                        <input
                          type="checkbox"
                          name={filter.key}
                          value={option}
                          checked={selected}
                          onChange={() => {
                            setCategoriasSeleccionadas(
                              selected
                                ? categoriasSeleccionadas.filter((c) => c !== option)
                                : [...categoriasSeleccionadas, option]
                            );
                          }}
                          className="form-checkbox h-5 w-5 rounded-full border-gray-300 text-red-600 focus:ring-red-500 transition"
                        />
                      </label>
                    );
                  })}
                </div>
              ) : filter.key === "modalidad" ? (
                <div className="flex flex-col gap-3 mt-2">
                  {filter.options.map((option: Modalidad) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="radio"
                        name={filter.key}
                        value={option}
                        checked={modalidad === option}
                        onChange={() => setModalidad(option)}
                        className="w-5 h-5 rounded-full border border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-base text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              ) : filter.key === "precio" ? (
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
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
