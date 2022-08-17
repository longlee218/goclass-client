import { Button, Card, Dropdown, Input, Menu, Typography } from 'antd';
import {
  faCopy,
  faEllipsisV,
  faReorder,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useNavigate } from 'react-router';

const dropdownSlide = (
  <Menu
    items={[
      {
        key: 'share',
        label: (
          <div>
            <FontAwesomeIcon icon={faReorder} style={{ marginRight: 10 }} />
            <Typography.Text strong type='secondary'>
              Sắp xếp
            </Typography.Text>
          </div>
        ),
      },
      {
        key: 'duplicate',
        label: (
          <div>
            <FontAwesomeIcon icon={faCopy} style={{ marginRight: 10 }} />
            &nbsp;
            <Typography.Text strong type='secondary'>
              Nhân đôi
            </Typography.Text>
          </div>
        ),
      },
      {
        key: 'delete',
        label: (
          <div>
            <FontAwesomeIcon
              icon={faTrash}
              color='red'
              style={{ marginRight: 10 }}
            />
            &nbsp;
            <Typography.Text strong type='danger'>
              Xóa
            </Typography.Text>
          </div>
        ),
      },
    ]}
  />
);

const AssignSlide = ({ slide }) => {
  const { _id, order, points, assignment } = slide;
  const navigate = useNavigate();

  const onClickCard = (e) => {
    e.preventDefault();
    let link = teacherRouteConfig.slideWithParam.replace(
      ':assignId',
      assignment
    );
    link = link.replace(':slideId', _id);
    navigate(link);
  };

  return (
    <Card
      key={_id}
      hoverable
      style={{
        display: 'inline-block',
        boxShadow: '0 0 8px 1px rgb(64 67 69 / 17%)',
      }}
      bodyStyle={{
        height: 'calc(155px + (1.2rem * 2))',
        padding: 0,
      }}
      actions={[
        <Typography.Text strong>{order}</Typography.Text>,
        <Input size='small' value={points} suffix={<small>pts</small>} />,
        <Dropdown
          placement='bottomLeft'
          arrow
          overlay={dropdownSlide}
          trigger={['click']}
        >
          <Button type='text' onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </Button>
        </Dropdown>,
      ]}
    >
      <div onClick={onClickCard}>
        <svg viewBox='0 0 1004 655'>
          <g className='root'>
            <g className='background'></g>
            <g className='content'>
              <g className='-N6MMV8T09-UTcTih6Yo'>
                <g className='elementRoot'>
                  <g className='background'>
                    <rect
                      x='69'
                      y='158.5'
                      width='706'
                      height='241.69229888916016'
                      fill='rgba(0,0,0,0)'
                      stroke='rgba(0,0,0,0)'
                      style={{
                        strokeWidth: 2,
                        strokeDasharray: 'inherit',
                      }}
                    ></rect>
                    <rect x='0' y='0' width='0' height='0'></rect>
                  </g>
                  <g className='content'>
                    <text
                      x='0'
                      y='0'
                      xmlSpace='preserve'
                      style={{ fontSize: '30px' }}
                      className='textbox'
                    >
                      <tspan
                        x='74'
                        y='194.39230651855468'
                        fill='#404041'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        In this assignment, you will be asked to create{' '}
                      </tspan>
                      <tspan
                        x='74'
                        y='233.00768966674804'
                        fill='#404041'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        and use number bonds. A number bond is the{' '}
                      </tspan>
                      <tspan
                        x='74'
                        y='271.6230728149414'
                        fill='#404041'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        relationship between a number and the parts{' '}
                      </tspan>
                      <tspan
                        x='74'
                        y='310.23845596313475'
                        fill='#404041'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        that make it.
                      </tspan>
                      <tspan
                        x='74'
                        y='348.8538391113281'
                        fill='#404041'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      ></tspan>
                      <tspan
                        x='74'
                        y='387.4692222595215'
                        fill='#404041'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        For a quick refresher, watch the video below.
                      </tspan>
                    </text>
                  </g>
                  <g className='interactive'></g>
                </g>
              </g>
              <g className='-N6MMV8T09-UTcTih6Yp'>
                <g className='elementRoot'>
                  <g>
                    <rect
                      x='681'
                      y='70'
                      width='250'
                      height='55'
                      rx='4'
                      ry='4'
                      fill='#f7f7f7'
                      stroke='#d8d8d8'
                      filter="url('#Sl6p87xr51yh')"
                      style={{
                        strokeWidth: 2,
                      }}
                    ></rect>
                    <image
                      xlinkHref='assets/colored-icons/play.png'
                      preserveAspectRatio='xMidYMid meet'
                      x='796'
                      y='87.5'
                      width='20'
                      height='20'
                      style={{
                        cursor: 'pointer',
                      }}
                    ></image>
                    <text
                      x='711'
                      y='85'
                      fill='#6d6e70'
                      style={{
                        dominantBaseline: 'middle',
                        fontSize: '16px',
                        textAnchor: 'middle',
                        pointerEvents: 'none',
                      }}
                    >
                      0:14
                    </text>
                  </g>
                  <g>
                    <rect
                      x='681'
                      y='70'
                      width='250'
                      height='55'
                      rx='4'
                      ry='4'
                      fill='rgba(0,0,0,0)'
                      style={{
                        cursor: 'pointer',
                      }}
                      className='touch-foreground'
                    ></rect>
                  </g>
                </g>
              </g>
              <g className='-N6MMV8UzLOI87o_D6eS'>
                <g className='elementRoot'>
                  <g>
                    <rect
                      x='75'
                      y='405'
                      width='250'
                      height='55'
                      rx='4'
                      fill='#f7f7f7'
                      stroke='#d8d8d8'
                      filter="url('#Sl6p87xr51eu')"
                      style={{
                        strokeWidth: 2,
                      }}
                    ></rect>
                    <image
                      xlinkHref='assets/colored-icons/youtube.svg'
                      preserveAspectRatio='xMidYMid meet'
                      x='95'
                      y='423'
                      width='20'
                      height='20'
                    ></image>
                    <text
                      x='0'
                      y='0'
                      style={{
                        alignmentBaseline: 'middle',
                        fontSize: 15,
                        pointerEvents: 'none',
                      }}
                    >
                      <tspan
                        x='135'
                        y='427.6384616851807'
                        fill='#98d64a'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        Watch this video for{' '}
                      </tspan>
                      <tspan
                        x='135'
                        y='446.94615325927737'
                        fill='#98d64a'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        help!
                      </tspan>
                    </text>
                  </g>
                  <g>
                    <rect
                      x='75'
                      y='405'
                      width='250'
                      height='55'
                      rx='4'
                      ry='4'
                      fill='rgba(0,0,0,0)'
                      style={{
                        pointerEvents: 'none',
                      }}
                      className='touch-foreground'
                    ></rect>
                  </g>
                </g>
              </g>
              <g className='-N6MMV8UzLOI87o_D6eT'>
                <g className='elementRoot'>
                  <g className='background'>
                    <rect
                      x='71'
                      y='60'
                      width='450'
                      height='63.096153259277344'
                      fill='rgba(0,0,0,0)'
                      stroke='rgba(0,0,0,0)'
                      style={{
                        strokeWidth: 2,
                        strokeDasharray: 'inherit',
                      }}
                    ></rect>
                    <rect x='0' y='0' width='0' height='0'></rect>
                  </g>
                  <g className='content'>
                    <text
                      x='0'
                      y='0'
                      xmlSpace='preserve'
                      style={{
                        fontSize: 45,
                      }}
                      className='textbox'
                    >
                      <tspan
                        x='76'
                        y='107.47692260742187'
                        fill='#884aff'
                        style={{ pointerEvents: 'none' }}
                        className='noselect'
                      >
                        Math Station 1
                      </tspan>
                    </text>
                  </g>
                  <g className='interactive'></g>
                </g>
              </g>
              <g className='-N6MMV8UzLOI87o_D6eU'>
                <g className='elementRoot'>
                  <g transform='translate(871.0869356951821,270.1316215334359) rotate(0)'>
                    <g transform='scale(1)' className='exif'>
                      <image
                        xlinkHref='https://www.googleapis.com/download/storage/v1/b/sheet-content-images/o/-N6MMV8UzLOI87o_D6eU?alt=media'
                        preserveAspectRatio='none'
                        x='-65.58665468700609'
                        y='-62.537841940784716'
                        width='131.17330937401218'
                        height='125.07568388156943'
                      ></image>
                      <rect
                        x='0'
                        y='0'
                        width='0'
                        height='0'
                        className='touch-foreground'
                      ></rect>
                      <rect
                        x='0'
                        y='0'
                        width='0'
                        height='0'
                        className='touch-foreground'
                      ></rect>
                    </g>
                    <g></g>
                  </g>
                </g>
              </g>
              <g className='-N6MMV8UzLOI87o_D6eV'>
                <g className='elementRoot'>
                  <g className='background'>
                    <rect
                      x='857.5'
                      y='222.5'
                      width='40'
                      height='40'
                      fill='rgba(0,0,0,0)'
                      stroke='rgba(0,0,0,0)'
                      style={{
                        strokeWidth: 2,
                        strokeDasharray: 'inherit',
                      }}
                    ></rect>
                    <rect x='0' y='0' width='0' height='0'></rect>
                  </g>
                  <g className='content'>
                    <text
                      x='0'
                      y='0'
                      xmlSpace='preserve'
                      style={{
                        fontSize: 25,
                      }}
                      className='textbox'
                    >
                      <tspan
                        x='862.5'
                        y='250.66922912597656'
                        fill='#ffffff'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        9
                      </tspan>
                    </text>
                  </g>
                  <g className='interactive'></g>
                </g>
              </g>
              <g className='-N6MMV8UzLOI87o_D6eW'>
                <g className='elementRoot'>
                  <g className='background'>
                    <rect
                      x='822.5'
                      y='277.5'
                      width='40'
                      height='40'
                      fill='rgba(0,0,0,0)'
                      stroke='rgba(0,0,0,0)'
                      style={{
                        strokeWidth: 2,
                        strokeDasharray: 'inherit',
                      }}
                    ></rect>
                    <rect x='0' y='0' width='0' height='0'></rect>
                  </g>
                  <g className='content'>
                    <text
                      x='0'
                      y='0'
                      xmlSpace='preserve'
                      style={{
                        fontSize: 25,
                      }}
                      className='textbox'
                    >
                      <tspan
                        x='827.5'
                        y='305.6692291259766'
                        fill='#ffffff'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        4
                      </tspan>
                    </text>
                  </g>
                  <g className='interactive'></g>
                </g>
              </g>
              <g className='-N6MMV8UzLOI87o_D6eX'>
                <g className='elementRoot'>
                  <g className='background'>
                    <rect
                      x='891.5'
                      y='278.5'
                      width='40'
                      height='40'
                      fill='rgba(0,0,0,0)'
                      stroke='rgba(0,0,0,0)'
                      style={{
                        strokeWidth: 2,
                        strokeDasharray: 'inherit',
                      }}
                    ></rect>
                    <rect x='0' y='0' width='0' height='0'></rect>
                  </g>
                  <g className='content'>
                    <text
                      x='0'
                      y='0'
                      xmlSpace='preserve'
                      style={{
                        fontSize: 25,
                      }}
                      className='textbox'
                    >
                      <tspan
                        x='896.5'
                        y='306.6692291259766'
                        fill='#884aff'
                        style={{
                          pointerEvents: 'none',
                        }}
                        className='noselect'
                      >
                        5
                      </tspan>
                    </text>
                  </g>
                  <g className='interactive'></g>
                </g>
              </g>
            </g>
            <g className='work'></g>
            <g className='sticker'></g>
            <g className='lineCapture'>
              <g className='newLine'></g>
            </g>
            <g className='panCapture'></g>
            <g className='placementCapture'></g>
          </g>
          <desc>Created with Snap</desc>
          <defs>
            <filter id='Sl6p87xr52r' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
            <filter id='Sl6p87xr53a' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
            <filter id='Sl6p87xr5mm' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
            <filter id='Sl6p87xr5qj' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
            <filter id='Sl6p87xr5r2' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
            <filter id='Sl6p87xr51ae' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
            <filter id='Sl6p87xr51eb' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
            <filter id='Sl6p87xr51eu' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
            <filter id='Sl6p87xr51yh' filterUnits='userSpaceOnUse'>
              <feGaussianBlur
                in='SourceAlpha'
                stdDeviation='3'
              ></feGaussianBlur>
              <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
              <feFlood flood-color='#d8d8d8'></feFlood>
              <feComposite in2='offsetblur' operator='in'></feComposite>
              <feComponentTransfer>
                <feFuncA type='linear' slope='1'></feFuncA>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in='SourceGraphic'></feMergeNode>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </Card>
  );
};

export default AssignSlide;
