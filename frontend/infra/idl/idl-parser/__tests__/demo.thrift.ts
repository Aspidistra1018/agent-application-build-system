/* eslint-disable */

import * as t from '../src/thrift';
import * as path from 'path';

const idl = `
/*
*/

struct UserDeleteDataMap {
    1: required UserDeleteData DeleteData
    2: string k2 (go.tag = 'json:\\"-\\"')
}

/*
We
*/
enum AvatarMetaType {
    UNKNOWN = 0,  // No data, incorrect data, or system error downgrade
    RANDOM = 1,   // When modifying or creating, the user does not specify a name or select the recommended text, the program randomly selects the avatar
}
`;

const document = t.parse(idl);
var c = path.join('a/b.thrift', './c.thrift');
console.log(JSON.stringify(document, null, 2));
