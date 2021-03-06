import styles from '../index.less';
import React from 'react';
import {  Card, Row, Col} from 'antd';
import {connect} from 'dva';
import AStackBar from '../../../components/Charts/AStackBar';


const AssetCard = ({allTrendData,dayWeightTrendData})=> {


  return <Card className={styles.commonCard}>
    <Row>
      <div className={styles.titleLabel}>
        <span>资产总览</span>
      </div>
    </Row>
    <Row>
      <Col span={12}>
        <AStackBar
          xName={'creatTime'}
        barName={['消费','锁仓']}
        dataKey={['floatingFunds','lockrepoFunds']}
        dataSource={allTrendData}
        />
        <span className={styles.chartTitle}>总量趋势</span>
      </Col>
      <Col span={12}>
        <AStackBar
          xName={'creatTime'}
          barName={['消费','锁仓']}
          dataKey={['floatingFunds','lockrepoFunds']}
          dataSource={dayWeightTrendData}/>
        <span className={styles.chartTitle}>每日分量</span>
      </Col>
    </Row>
  </Card>
};

function mapStateToProps(state){
  const {allTrendData,dayWeightTrendData} = state.home;
  return {
    allTrendData,
    dayWeightTrendData
  };
}
export default connect(mapStateToProps)(AssetCard);
