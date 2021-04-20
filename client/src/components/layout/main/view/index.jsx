import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  ReadOutlined,
  ProfileOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

import styles from '../styles/index.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Main extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state,
          { active, breadcrumbs, text } = this.props;

    let breadcrumb = breadcrumbs.map((item, index) => 
      <Breadcrumb.Item>{item}</Breadcrumb.Item>
    )
    console.log(breadcrumbs,breadcrumb);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className={cx("logo")} />
          <Menu theme="dark" defaultSelectedKeys={[active]} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<ReadOutlined />} title="文章">
              <Menu.Item key="2">
                <Link to="/article/work">工作</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/article/life">生活</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/article/others">其他</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5" icon={<ProfileOutlined />}>
              <Link to="/messageboard">留言板</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<EllipsisOutlined />}>
              <Link to="/about">关于</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={cx("site-layout")}>
          {/* <Header className={cx("site-layout-background")} style={{ padding: 0 }} /> */}
          <Content className={cx("mian-content")} style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                breadcrumbs.map(
                  (item, index) => <Breadcrumb.Item>{item}</Breadcrumb.Item>
                )
              }
            </Breadcrumb>
            <div className={cx("site-layout-background")} style={{ padding: 24}}>
              {text}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    );
  }
}