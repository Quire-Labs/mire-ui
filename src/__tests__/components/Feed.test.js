import React from 'react';
import ReactDOM from 'react-dom';
import Feed from '../../components/Feed';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('mounts without error', () => {
  shallow(<Feed />);
});
