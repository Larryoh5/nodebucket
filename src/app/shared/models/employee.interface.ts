/**
 * * Title: employee.interface.ts
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */

import { Item } from './item.interface';

export interface Employee {
    empId: string;
    todo: Item[];
    done: Item[];

}
