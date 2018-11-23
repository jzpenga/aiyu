import styles from '../index.less';
import React from 'react';
import {connect} from 'dva';
import {  Card, Row, Col} from 'antd';
import AStackBar from '../../../../components/Charts/AStackBar';
import APieChart from '../../../../components/Charts/APieChart';


class IncrementCard extends React.Component{

  render(){
    const {incrementData,incrementTrendData} = this.props;
    return <Card className={styles.commonCard}>
      <Row className={styles.titleLabel}>
        <Col span={24}>昨日增量</Col>
      </Row>
      <Row gutter={12}>
        <Col span={8}>
          <span className={styles.chartTitle}>总增量{` 1500000  `}</span>
        </Col>
        <Col span={8}>
          <span className={styles.chartTitle}>流动增量{` 800000  `}</span>
        </Col>
        <Col span={8}>
          <span className={styles.chartTitle}>锁仓增量{` 700000`}</span>
        </Col>
      </Row>
      <Row>
        <Col span={12} push={2}>
          <APieChart
            dataKey={['value']}
            dataSource={incrementData}
          />
        </Col>
        <Col span={12}>
          <AStackBar
            xName={'creatTime'}
            barName={['流动','锁仓']}
            dataKey={['floatingFunds','lockrepoFunds']}
            dataSource={incrementTrendData}
          />
          <span className={styles.chartTitle}>趋势</span>
        </Col>
      </Row>
    </Card>;
  }
}

const mapStateToProps = (state)=>{
  const {incrementData,incrementTrendData} = state.asset;
  return {incrementData,incrementTrendData};
};

export default connect(mapStateToProps)(IncrementCard);
