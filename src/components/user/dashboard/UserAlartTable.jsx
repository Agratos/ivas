import React from 'react';
import GridItem from 'components/layout/container/GridItem';
import AlarmTable from 'components/common/table/AlarmTable';

import alarmList from 'assets/dummies/alarmList';

const UserAlartTable = () => {
    const handleAlarm = (id) => {
        // TODO: 장애 현황 수동종료 추가
        console.log(id);
      };

    return (
        <GridItem xs={12} sm={12} md={12}>
            <AlarmTable alarmList={alarmList} handleAlarm={handleAlarm} />
        </GridItem>
    )
}

export default UserAlartTable;