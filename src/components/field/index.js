import React, {Component} from 'react';
import Text from './components/Text';
import TextArea from "./components/TextArea";
import Selection from "./components/Selection";
import Radio from "./components/Radio";
import Checkbox from "./components/Checkbox";
import Switch from "./components/Switch";

class Field extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

            </div>
        );
    }

}

Field.Text = Text;
Field.TextArea = TextArea;
Field.Selection = Selection;
Field.Radio = Radio;
Field.Checkbox = Checkbox;
Field.Switch = Switch;
export default Field;