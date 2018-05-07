import React, { Component } from 'react';
import Form from './formElements';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import { FullColumn } from '../../../components/utility/rowColumn';
import Papersheet from '../../../components/utility/papersheet';
import CodeMirror from '../../AdvancedModules/CodeMirror/codeMirror.style';
import { FormsComponentWrapper, FormsMainWrapper } from './formik.style';

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
			<LayoutWrapper>
				<FormsMainWrapper>
					<FormsComponentWrapper className="mateFormsComponent">
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
		);
	}
}
