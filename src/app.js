import { WebGLComponent } from './components/webgl.component';

document.onreadystatechange = () => {
    if ('complete' === document.readyState) {
        new WebGLComponent().render();
    }
};
