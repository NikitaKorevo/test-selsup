import React from 'react';

interface Color {}

enum Type {
  String = 'string',
  Number = 'number',
}

type Value = string | number;

export interface Param {
  id: number;
  name: string;
  type?: Type;
}

interface ParamValue {
  paramId: number;
  value: Value;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  params: Param[];
  model: Model;
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      params: this.props.params,
      model: this.props.model,
    };
  }

  getInputType(type?: Type) {
    switch (type) {
      case Type.Number:
        return 'number';
      case Type.String:
      default:
        return 'text';
    }
  }

  public getModel(): Model {
    return this.state.model;
  }

  handleChange(id: number, newValue: Value) {
    this.setState(prevState => {
      const { colors, paramValues } = prevState.model;
      const newParamValues = paramValues.map(({ paramId, value }) => ({
        paramId,
        value: paramId === id ? newValue : value,
      }));

      return {
        model: { colors, paramValues: newParamValues },
      };
    });
  }

  render() {
    return (
      <>
        {this.props.params.map(({ id, name, type }) => {
          const { value = '' } = this.state.model.paramValues.find(({ paramId }) => paramId === id) ?? {};

          return (
            <div key={id} style={{ paddingBottom: 8 }}>
              <span style={{ marginRight: 16 }}>{name}</span>
              <input
                type={this.getInputType(type)}
                value={value}
                onChange={({ target }) => this.handleChange(id, target.value)}
              />
            </div>
          );
        })}
      </>
    );
  }
}
