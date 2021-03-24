import connection from '@config/database';

import User from '@models/User/User';
import Language from '@models/Language/Language';

User.init(connection);
Language.init(connection);

User.associate(connection.models);
Language.associate(connection.models);

export default connection;
