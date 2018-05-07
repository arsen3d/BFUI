import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { reducer as reduxFormReducer } from 'redux-form';
import Form from './formElements';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet from '../../../components/utility/papersheet';
import { FullColumn } from '../../../components/utility/rowColumn';
import CodeMirror from '../../AdvancedModules/CodeMirror/codeMirror.style';
import { FormsComponentWrapper, FormsMainWrapper } from './forms.style';

injectTapEventPlugin();

const reducer = combineReducers({ form: reduxFormReducer });
const store = createStore(reducer);

export default class extends Component {
	state = {
		result: '',
	};
	onSubmit = value => {
		if (value) {
			this.setState({ result: `${JSON.stringify(value, null, 4)}` });
		} else {
			this.setState({ result: '' });
		}
	};
	render() {
		const { result } = this.state;
		return (
			<Provider store={store}>
				<LayoutWrapper>
					<FormsMainWrapper>
						<FormsComponentWrapper className=" mateFormsComponent ">
							<FullColumn>
								<Papersheet>
									<Form onSubmit={this.onSubmit} />
								</Papersheet>
								{result ? (
									<CodeMirror
										value={result}
										options={{
											lineNumbers: true,
											theme: 'material',
											readOnly: true,
											tabSize: 4,
											mode: 'javascript',
										}}
									/>
								) : (
									''
								)}
							</FullColumn>
						</FormsComponentWrapper>
					</FormsMainWrapper>
				</LayoutWrapper>
			</Provider>
		);
	}
}
