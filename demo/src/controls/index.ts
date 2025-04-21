import DemoWrapper from './DemoWrapper.vue';
import DemoCheckbox from './DemoCheckbox.vue';
import DemoInput from './DemoInput.vue';
import DemoButton from './DemoButton.vue';
import ControlSection from './ControlSection.vue';
import DemoColorPicker from './DemoColorPicker.vue';
import ButtonGroup from './ButtonGroup.vue';
import DemoNavigation from './DemoNavigation.vue';
import DemoSlider from './DemoSlider.vue';
import DemoToggle from './DemoToggle.vue';
import DemoSelect from './DemoSelect.vue';

export {
	DemoWrapper,
	DemoCheckbox,
	DemoInput,
	DemoButton,
	ControlSection,
	DemoColorPicker,
	ButtonGroup,
	DemoNavigation,
	DemoSlider,
	DemoToggle,
	DemoSelect,
};

// Types for prop validation
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'danger';
