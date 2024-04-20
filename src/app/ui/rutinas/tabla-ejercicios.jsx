'use client'

import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Image, Button } from '@nextui-org/react';
import { Rate } from 'rsuite';
import { renderRateCharacter } from '@/app/lib/utils';

export default function TablaEjercicios({ data, setData }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'series',
        header: 'Series',
        Cell: ({ row }) => (
          <>{row.original.series}x{row.original.repeticiones}</>
        )
      },
      {
        accessorKey: 'ejercicio.nombre',
        header: 'Ejercicio',
        Cell: ({ row }) => (
          <div className='flex gap-3 items-center'>
            <img src="/excercises/img-excercise1.png" className='rounded' alt={ 'Imagen de ' + row.original.ejercicio.nombre } height={35} width={35} />
            <span>{row.original.ejercicio.nombre}</span>
          </div>
        )
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
        )
      },
      {
        accessorKey: 'ejercicio.dificultad',
        header: 'Dificultad',
        Cell: ({ row }) => (
          <Rate value={row.original.ejercicio.dificultad} size='xs' readOnly renderCharacter={renderRateCharacter} />
        )
      },
      {
        Cell: ({ row }) => (
          <>
            <Button color='secondary'>Acción<i className="ri-arrow-down-s-fill ms-2"></i></Button>
          </>
        ),
        id: 'actions',
      }
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
    muiTableContainerProps: { sx: { maxHeight: '400px' }},
    enableRowOrdering: true,
    muiRowDragHandleProps: ({ table }) => ({
        onDragEnd: () => {
          const { draggingRow, hoveredRow } = table.getState();
          if (hoveredRow && draggingRow) {
            data.splice(
              hoveredRow.index,
              0,
              data.splice(draggingRow.index, 1)[0],
            );
            setData([...data]);
          }
        },
      }),
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
