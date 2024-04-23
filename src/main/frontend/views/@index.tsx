import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { NavLink } from 'react-router-dom';

export const config: ViewConfig = {
  title: 'Hilla AutoGrid CSV-Export',
  menu: {
    exclude: true,
  },
};

export default function Index() {
  return (
    <div className='p-l'>
      <h2>Hilla AutoGrid CSV-Export</h2>
      <ul>
        <li>
          <NavLink to='/orders'>Orders</NavLink>
        </li>
      </ul>
    </div>
  );
}
