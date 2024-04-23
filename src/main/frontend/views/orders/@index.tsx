import { EndpointRequestInit } from '@vaadin/hilla-frontend';
import { AutoGrid } from '@vaadin/hilla-react-crud';
import { Button, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import OrderModel from 'Frontend/generated/com/example/application/entities/OrderModel';
import Filter from 'Frontend/generated/com/vaadin/hilla/crud/filter/Filter';
import Pageable from 'Frontend/generated/com/vaadin/hilla/mappedtypes/Pageable';
import { OrderBrowserCallable } from 'Frontend/generated/endpoints';
import { useMemo, useState } from 'react';

export default function Orders() {
  const [filter, setFilter] = useState<Filter>();
  
  const ObservableOrderBrowserCallable = useMemo(() => ({
    ...OrderBrowserCallable,
    list(pageable: Pageable, filter: Filter | undefined, init?: EndpointRequestInit) {
        setFilter(filter);
        return OrderBrowserCallable.list(pageable, filter, init);
    },
  }), []);
  
  return (
    <VerticalLayout className='h-full'>
      <AutoGrid model={OrderModel} service={ObservableOrderBrowserCallable} />
      <HorizontalLayout className='self-end' theme='margin'>
        <Button theme='primary' onClick={async () => {
          if (filter) {
            try {
              const response = await fetch('/api/export', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(filter)
              })
              if (response.ok) {
                const blob = await response.blob();
                const exportFile = new File([blob], 'export.csv', { type: 'text/csv' })
                const url = window.URL.createObjectURL(exportFile);
                window.open(url, '_blank');
                URL.revokeObjectURL(url);
              } else {
                alert('Download of export data failed')
              }
            } catch (e) {
              console.error('Could not download export data');
              console.error(e);
            }
          } else {
            alert('No filter data available');
          }
        }}>
          Export
        </Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}
