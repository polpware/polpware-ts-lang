import { ITypeDef, safeParseBool, safeParseFloat, safeParseInt, safeParseString, tyBool, tyDate, tyNumber, tyString } from '@polpware/fe-utilities';

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

export function interpretOperator(op: OperatorEnum, ty: ITypeDef) {
    op = safeParseInt(op);
    let s = '';
    switch (op) {
        case OperatorEnum.LessThan:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) < 0';
            } else {
                s = '{left} < {right}';
            }

            break;
        case OperatorEnum.LessThanEqual:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) <= 0';
            } else {
                s = '{left} <= {right}';
            }

            break;
        case OperatorEnum.Equal:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) == 0';
            } else {
                s = '{left} == {right}';
            }

            break;
        case OperatorEnum.NotEqual:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) != 0';
            } else {
                s = '{left} != {right}';
            }

            break;
        case OperatorEnum.GreaterThan:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) > 0';
            } else {
                s = '{left} > {right}';
            }

            break;
        case OperatorEnum.GreaterThanEqual:
            if (ty == tyString) {
                s = 'String.Compare({left}, {right}, true) >= 0';
            } else {
                s = '{left} >= {right}';
            }

            break;
        case OperatorEnum.Contain:
            s = '{left}.IndexOf({right}) != -1';
            break;
        case OperatorEnum.NotContain:
            s = '{left}.IndexOf({right}) == -1';
            break;
        case OperatorEnum.StartWith:
            s = '{left}.StartsWith({right})';
            break;
        case OperatorEnum.EndWith:
            s = '{left}.EndsWith({right})';
            break;
        default:
            s = '';
            break;
    }

    return s;
}

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

/**
 * Computes the representation for the given value with the given type. 
 * The given value is a known value, and it can be of one of many types. 
 * Typically, the value is directly obtained from the user input in Form. 
 *
 * Our goal is product a valid C# expression for the given value, while repsecting 
 * the type information of the value. 
 * 
 * The representation is a valid C# expression. 
 * @param value
 * @param valueType
 */
export function getTypeSafeValueRep(value: any, valueType: ITypeDef) {
    if (valueType == tyBool) {
        value = safeParseBool(value);
    } else if (valueType == tyNumber) {
        value = safeParseFloat(value);
    } else if (valueType == tyDate) {
        value = safeParseString(value);
        value = '"' + value + '"';
        value = `DateTime.Parse(${value})`;
    } else { // string 
        value = safeParseString(value);
        value = '"' + value + '"';
    }
    return value;
}

/**
 * Build the right type convertor (in C#) for the given variable (a string) 
 * with the given type information. 
 * 
 * What is different from the above is that the above generates a valid literal from 
 * a given known value. 
 * 
 * In contrast, the given value in this method is a variable (a string), we have to generate 
 * a right type cast for the given string to produce a type safe value at run time. 
 * Therefore, 
 *   - we do not quote the given value. 
 * @param varName
 * @param varType
 */
export function buildTypeConvertor(varName: string, varType: ITypeDef) {
    if (varType == tyBool) {
        varName = `bool.Parse(${varName})`;
    } else if (varType == tyNumber) {
        varName = `double.Parse(${varName})`;
    } else if (varType == tyDate) {
        varName = `DateTime.Parse(${varName})`;
    }
    return varName;
}
