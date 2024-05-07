'use client'

import { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Image, Button, useDisclosure, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { Rate } from 'rsuite';
import { renderRateCharacter } from '@/app/lib/utils';
import { MRT_Localization_ES } from '@/app/material-react-table-config/locales/es';

export default function TablaEjercicios({ data, setData }) {
  const eliminarItem = (index) => {
    const aux = [...table.options.data]
    aux.splice(index, 1)
    setData(aux)
  }

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
            <img src="/excercises/img-excercise1.png" className='rounded' alt={'Imagen de ' + row.original.ejercicio.nombre} height={35} width={35} />
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
      {
        Cell: ({ row }) => (
          <>
            <Popover placement="bottom" showArrow>
              <PopoverTrigger>
                <Button title='Eliminar' color='danger' variant='flat' isIconOnly startContent={<i className="ri-delete-bin-2-line"></i>}></Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold mb-2">¿Estas seguro que quieres quitar este ejercicio?</div>
                  <div className="flex flex-wrap justify-end gap-3">
                    <Button color='danger' variant='flat' onClick={() => eliminarItem(row.index)}>Eliminar</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </>
        ),
        id: 'actions',
        grow: false,
        maxSize: 'fit-content'
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
    muiTableContainerProps: { sx: { maxHeight: '400px' } },
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
    localization: MRT_Localization_ES,
    localization: {
      move: ''
    }
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
