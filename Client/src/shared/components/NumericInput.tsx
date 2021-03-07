import { ChangeEvent } from 'react';
import { Input, InputProps } from 'antd';

export const NumericInput = (props: InputProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const reg = /^-?\d*(\.\d*)?$/;

        if ((!isNaN(Number(value)) && reg.test(value)) || value === '' || value === '-') {
            props.onChange && props.onChange(e);
        }
    };

    return <Input {...props} onChange={onChange} />;
};

// class NumericInput extends React.Component {
//

//     // '.' at the end or only '-' in the input box.
//     onBlur = () => {
//       const { value, onBlur, onChange } = this.props;
//       let valueTemp = value;
//       if (value.charAt(value.length - 1) === '.' || value === '-') {
//         valueTemp = value.slice(0, -1);
//       }
//       onChange(valueTemp.replace(/0*(\d+)/, '$1'));
//       if (onBlur) {
//         onBlur();
//       }
//     };

//     render() {
//       const { value } = this.props;
//       const title = value ? (
//         <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
//       ) : (
//         'Input a number'
//       );
//       return (
//         <Tooltip
//           trigger={['focus']}
//           title={title}
//           placement="topLeft"
//           overlayClassName="numeric-input"
//         >
//           <Input
//             {...this.props}
//             onChange={this.onChange}
//             onBlur={this.onBlur}
//             placeholder="Input a number"
//             maxLength={25}
//           />
//         </Tooltip>
//       );
//     }
//   }
