import OpticalFlow from './index';

export default class App {

    constructor() {

        new OpticalFlow();

    }

}

window.onload = () => new App();