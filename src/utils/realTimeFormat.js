
import { format } from 'date-fns';

const realTimeFormat = () => {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
}

export default realTimeFormat;