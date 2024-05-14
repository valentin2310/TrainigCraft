'use client'

import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Rate } from 'rsuite';
import { renderRateCharacter } from '@/app/lib/utils';
import { MRT_Localization_ES } from '@/app/material-react-table-config/locales/es';

export default function TablaEjerciciosSimple({ data }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'series',
        header: 'Series',
        Cell: ({ row }) => (
          <>{row.original.series}x{row.original.repeticiones}{row.original.tipo == 'tiempo' && ' seg'}</>
        ),
        grow: false,
        maxSize: 'fit-content'
      },
      {
        accessorKey: 'ejercicio.nombre',
        header: 'Ejercicio',
        Cell: ({ row }) => (
          <div className='flex gap-3 items-center'>
            <img src={row.original.ejercicio?.imgPath ?? "/excercises/img-excercise1.png"} className='rounded' alt={ 'Imagen de ' + row.original.ejercicio.nombre } height={80} width={80} />
            <span>{row.original.ejercicio.nombre}</span>
          </div>
        ),
        grow: true
      },
      {
        accessorKey: 'peso',
        header: 'Peso/Lastre',
        Cell: ({ cell }) => (
          <>
            {cell.getValue() > 0 &&
              <>{cell.getValue()} kg</> ||
              <></>
            }
          </>
        ),
        grow: false,
        maxSize: 'fit-content'
      },
      {
        accessorKey: 'ejercicio.dificultad',
        header: 'Dificultad',
        Cell: ({ row }) => (
          <Rate value={row.original.ejercicio.dificultad} size='xs' readOnly renderCharacter={renderRateCharacter} />
        ),
        grow: false,
        maxSize: 'fit-content'
      },
    ],
    [],
  );

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, 
    autoResetPageIndex: true,
    enableColumnOrdering: false,
    enableSorting: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableFilters: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    muiTableContainerProps: { sx: { maxHeight: '1200px' }},
      localization: MRT_Localization_ES,
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
