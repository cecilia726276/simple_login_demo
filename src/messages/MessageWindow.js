
import React, { PureComponent, lazy, Suspense } from 'react';
import { Avatar, Icon, Popover } from 'antd';
import '../style/MessageWindow.css';

// lodash 深比较
import isEqual from 'lodash/isEqual';

// 渲染不同内容的组件
const LazyComponent = lazy(() => import('./RenderContent'));

export default class MessageWindow extends PureComponent {
    state = {
        deleteBtnSpin: false,
        loading: true,
        list: [
            {
                time: '2018-11-12 15:35:15',
                avatar:
                    'https://sx-stag.oss-cn-shenzhen.aliyuncs.com/user-avatar/3_avatar.jpg?x-oss-process=image/resize,m_fixed,w_90,h_90/quality,q_90',
                nickname: '用户甲',
                pos: 1,
                voice:
                    'https://sx-stag.oss-cn-shenzhen.aliyuncs.com/user-chat/3_508340417_c84f79407f5bc16b9e7ee0373631cf35.aac',
                text: '',
            },

            // {
            //     time: '2018-11-12 15:37:15',
            //     avatar:
            //         'https://sx-stag.oss-cn-shenzhen.aliyuncs.com/user-avatar/3_avatar.jpg?x-oss-process=image/resize,m_fixed,w_90,h_90/quality,q_90',
            //     nickname: '卡布奇诺',
            //     pos: 2,
            //     voice: '',
            //     text:
            //         '该词语多用于讽刺和揶揄调侃。也有送快递、查水电气、社区送温暖等引申说法。例如：（1）有人在网络上发表了不合乎相关法律法规或者破坏社会稳定和谐等消息而被警方捕；（2）在贴吧或论坛里拥有删帖权限的大小吧主，检查贴吧里是否存在灌水的帖子或跟帖，遇到就进行删除的行为。',
            // },
            {
                time: '2018-11-12 15:38:15',
                avatar:
                    'https://sx-stag.oss-cn-shenzhen.aliyuncs.com/user-avatar/3_avatar.jpg?x-oss-process=image/resize,m_fixed,w_90,h_90/quality,q_90',
                nickname: '卡布奇诺',
                pos: 2,
                voice: '',
                img:
                    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3040115650,4147729993&fm=26&gp=0.jpg',
                text:
                    '该词语多用于讽刺和揶揄调侃。也有送快递、查水电气、社区送温暖等引申说法。例如：（1）有人在网络上发表了不合乎相关法律法规或者破坏社会稳定和谐等消息而被警方捕；（2）在贴吧或论坛里拥有删帖权限的大小吧主，检查贴吧里是否存在灌水的帖子或跟帖，遇到就进行删除的行为。',
            },
            {
                time: '2018-11-12 15:39:15',
                avatar:
                    'https://sx-stag.oss-cn-shenzhen.aliyuncs.com/user-avatar/3_avatar.jpg?x-oss-process=image/resize,m_fixed,w_90,h_90/quality,q_90',
                nickname: '卡布奇诺',
                pos: 2,
                voice: '',
                img:
                    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3040115650,4147729993&fm=26&gp=0.jpg',
            },
        ],
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { data } = nextProps;

        // 若是props和缓存state一致,则不更新state
        if (isEqual(prevState.prevData, nextProps.data)) {
            return null;
        }
       // 若是没有传入props也是
        if (!data || !Array.isArray(data) || data.length <= 0) {
            return null;
        }
        return {
            list: data,
            prevData: nextProps.data,
        };
    }

    componentWillMount() {

    }
    // 唤醒子组件的回调过程
    wakeUpLazyComponent = () => {
        return <div>loading.....</div>;
    };

    // 悬浮条目显示删除按钮
    showOperatBtn = index => {
        let tmpList = [...this.state.list];
        tmpList = tmpList.map((item, innerIndex) => {
            if (index === innerIndex) {
                item.operatBtn = true;
            } else {
                item.operatBtn = false;
            }
            return item;
        });
        this.setState({ list: tmpList });
    };

    // 关闭操作按钮
    hideOperatBtn = index => {
        let tmpList = [...this.state.list];
        tmpList = tmpList.map((item, innerIndex) => {
            item.operatBtn = false;
            return item;
        });
        this.setState({ list: tmpList });
    };

    // 删除这条回复
    deleteCurrentReplay = (index, itemInfo) => {
        let tmpList = [...this.state.list];
        tmpList.splice(index, 1);
        this.setState({ list: tmpList });
        // 给父的回调,把该item的所有信息返回,外部再去执行接口操作什么的
        if (this.props.deleteItem) {
            this.props.deleteItem(itemInfo);
        }
    };

    render() {
        const { list, deleteBtnSpin } = this.state;
        // 是否显示操作区域
        const { operate } = this.props;
        // 渲染组件的前置条件
        const isRender = list && list.length > 0;
        return (
            <div>
            <ul className='list-wrapper'>
                {isRender &&
                list.map((item, listIndex) => {
                    return (
                        <Suspense fallback={this.wakeUpLazyComponent()} key={listIndex}>
                            <li
                                className='list-item'
                                // onMouseOver={() => this.showOperatBtn(listIndex)}
                                // onMouseLeave={() => this.hideOperatBtn(listIndex)}
                            >
                                <span className='time'>{item.time ? item.time : '时间占位符'}</span>
                                <div
                                    className={
                                        item.pos === 1
                                            ?'list-item-horizontal'
                                            : 'list-item-horizontal-reverse'
                                    }
                                >
                                    <Avatar
                                        shape="square"
                                        src={
                                            item.avatar
                                                ? item.avatar
                                                : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                        }
                                    />
                                    <div
                                        className={
                                            item.pos === 1 ? 'content-wrapper-flex' : 'content-wrapper'
                                        }
                                    >
                                        <p className={item.pos === 1 ? 'nickname' : 'nickname-right'}>
                                            {item.nickname ? item.nickname : '用户昵称占位符'}
                                        </p>
                                        <div className='content'>
                                            <LazyComponent {...item} />
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </Suspense>
                    );
                })}
            </ul>
            <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
            </div>
        </div>
        );
    }
}


