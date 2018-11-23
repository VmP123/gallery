import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router'

import Breadcrumb from './components/Breadcrumb.js';
import Breadcrumbs from './components/Breadcrumbs.js';
import Header from './components/Header.js';
import Photo from './components/Photo.js';
import Album from './components/Album.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Breadcrumb', () => {
	it('renders without crashing', () => {
		const tree = renderer
			.create(<MemoryRouter><Breadcrumb url={'http://www.google.com'} name={'Testing'} /></MemoryRouter>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});	
})

describe('Breadcrumbs', () => {
	it('renders without crashing', () => {
		const store = {
			breadcrumbs: [
				{
					name: 'Eka',
					url: 'http://www.google.com',
				},
				{
					name: 'Toka',
					url: 'http://www.google.com',
				}
			],
			getData() {
				console.log('Testing');
			}
		}
		
		const tree = renderer
			.create(<MemoryRouter><Breadcrumbs store={store} /></MemoryRouter>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});	
})

describe('Header', () => {
	it('renders without crashing', () => {		
		const tree = shallow(
			<Header />
		);
		expect(tree.debug()).toMatchSnapshot();
	});	
})

describe('Photo', () => {
	it('renders without crashing', () => {		
		const tree = shallow(
			<Photo thumbnailUrl={'http://www.google.com'} photoUrl={'http://www.google.com'} openPhoto={() => console.log('Testing')} />
		);
		expect(tree.debug()).toMatchSnapshot();
	});	
})

describe('Album', () => {
	it('renders without crashing', () => {		
		const tree = shallow(
			<MemoryRouter><Album name={'Testing'} thumbnailUrl={'http://www.google.com'} photoUrl={'http://www.google.com'} openAlbum={() => console.log('Testing')} /></MemoryRouter>
		);
		expect(tree.debug()).toMatchSnapshot();
	});	
})

