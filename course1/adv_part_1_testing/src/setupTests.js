import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new Adapter()});


//install enzyme and enzyme-adapter-react-{VERSION_OF_REACT}
//the setup file docs : http://airbnb.io/enzyme/docs/installation/