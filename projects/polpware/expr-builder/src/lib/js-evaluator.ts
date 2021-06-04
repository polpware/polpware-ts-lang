import { ITypeDef, safeParseBool, safeParseFloat, safeParseInt, safeParseString, tyBool, tyDate, tyNumber } from '@polpware/fe-utilities';
import { OperatorEnum } from './binary-operators';


/**
 * Computes the type safe value in Javascript.
 * @param value
 * @param valueType
 */
export function getTypeSafeValue(value: any, valueType: ITypeDef) {
    if (valueType == tyBool) {
        value = safeParseBool(value);
    } else if (valueType == tyNumber) {
        value = safeParseFloat(value);
    } else if (valueType == tyDate) {
        value = safeParseString(value);
        value = Date.parse(value);
    } else { // string 
        value = safeParseString(value);
    }
    return value;
}


/**
 * Evalutes the given assertion if it holds.
 * @param value
 * @param op
 * @param ty
 * @param expected
 */
export function evaluateAssertion(value: any, op: OperatorEnum, ty: ITypeDef, expected: any): boolean {
    op = safeParseInt(op);
    let s = false;
    switch (op) {
        case OperatorEnum.LessThan:
            s = getTypeSafeValue(value, ty) < getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.LessThanEqual:
            s = getTypeSafeValue(value, ty) <= getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.Equal:
            s = getTypeSafeValue(value, ty) == getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.NotEqual:
            s = getTypeSafeValue(value, ty) != getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.GreaterThan:
            s = getTypeSafeValue(value, ty) > getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.GreaterThanEqual:
            s = getTypeSafeValue(value, ty) >= getTypeSafeValue(expected, ty);
            break;
        case OperatorEnum.Contain:
            s = (getTypeSafeValue(value, ty) as string).indexOf(getTypeSafeValue(expected, ty)) != -1;
            break;
        case OperatorEnum.NotContain:
            s = getTypeSafeValue(value, ty).indexOf(getTypeSafeValue(expected, ty)) == -1;
            break;
        case OperatorEnum.StartWith:
            s = (getTypeSafeValue(value, ty) as string).startsWith(getTypeSafeValue(expected, ty));
            break;
        case OperatorEnum.EndWith:
            s = (getTypeSafeValue(value, ty) as string).endsWith(getTypeSafeValue(expected, ty));
            break;
        default:
            break;
    }

    return s;
}
