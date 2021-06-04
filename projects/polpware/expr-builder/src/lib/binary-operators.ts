export enum OperatorEnum {
    Undefined = 0,
    LessThan,
    LessThanEqual,
    Equal,
    NotEqual,
    GreaterThan,
    GreaterThanEqual,

    Contain,
    NotContain,
    StartWith,
    EndWith
}

export const OperatorOptions4Number = [
    {
        text: '<',
        value: OperatorEnum.LessThan
    }, {
        text: '<=',
        value: OperatorEnum.LessThanEqual
    }, {
        text: '==',
        value: OperatorEnum.Equal
    }, {
        text: '!=',
        value: OperatorEnum.NotEqual
    }, {
        text: '>',
        value: OperatorEnum.GreaterThan
    }, {
        text: '>=',
        value: OperatorEnum.GreaterThanEqual
    }
];


export const OperatorOptions4Bool = [
    {
        text: '==',
        value: OperatorEnum.Equal
    }, {
        text: '!=',
        value: OperatorEnum.NotEqual
    }
];

export const OperatorOptions4Text = [
    {
        text: 'Contains',
        value: OperatorEnum.Contain
    }, {
        text: 'Contains no',
        value: OperatorEnum.NotContain
    }, {
        text: 'Starts with',
        value: OperatorEnum.StartWith
    }, {
        text: 'Ends with',
        value: OperatorEnum.EndWith
    }, {
        text: '<',
        value: OperatorEnum.LessThan
    }, {
        text: '<=',
        value: OperatorEnum.LessThanEqual
    }, {
        text: '==',
        value: OperatorEnum.Equal
    }, {
        text: '!=',
        value: OperatorEnum.NotEqual
    }, {
        text: '>',
        value: OperatorEnum.GreaterThan
    }, {
        text: '>=',
        value: OperatorEnum.GreaterThanEqual
    }
];

/**
 * Translates the given string into a operator value.
 * Note that this method is expected to be invoked when  
 * parsing a dataflow or report. 
 * Thus, the input value is well-defined and must be 
 * one of the given value. 
 * @param op
 */
export function translateStringToOperator(op: string) {
    switch (op) {
        case '<':
            return OperatorEnum.LessThan;
        case '<=':
            return OperatorEnum.LessThanEqual;
        case '==':
            return OperatorEnum.Equal;
        case '!=':
            return OperatorEnum.NotEqual;
        case '>':
            return OperatorEnum.GreaterThan;
        case '>=':
            return OperatorEnum.GreaterThanEqual;
        case 'Contains':
            return OperatorEnum.Contain;
        case 'DoesNotContain':
            return OperatorEnum.NotContain;
        case 'StartsWith':
            return OperatorEnum.StartWith;
        case 'EndsWith':
            return OperatorEnum.EndWith;
        default:
            return OperatorEnum.Undefined;
    }
}
