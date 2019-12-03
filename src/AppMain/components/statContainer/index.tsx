import {csvStringMaker} from "../../utils";
import {ReactComponent as Download} from "../../Home/PageHolder/assets/download.svg";
import {Table} from "../Table";
import {AreaDiagramm} from "../AreaDiagramm";
import React, { FunctionComponent } from 'react';

interface OwnProps {
    data_in:any,
    data_out:any,
    headers: string[],
    name: string
}

const noValueOption = (obj:any) => {
    if(obj){
       let newObj = obj;
        newObj['Value'] = null;
        return newObj;
    }
}

type Props = OwnProps;

const StatContainer: FunctionComponent<Props> = ({data_in, data_out, headers, name}) => {

  return (
      <div className={'Stat_container'}>
          <div className="LabelContainer">
              <div className="header">
                  <h2 className="Label">{name} при поступлении</h2>
              </div>
              <a className={'LinkCsv'} href={csvStringMaker(data_in, headers)} download={`${name}_при_пост_export.csv`}>Загрузить <Download/>
              </a>
          </div>
          {
              data_in &&
              data_in.length > 0 ?
                  <Table
                      data={data_in}
                      headers={headers}
                  />
                  :
                  <p>Загрузка .....</p>
          }
          <div className="LabelContainer">
              <div className="header">
                  <h2 className="Label">{name} при выписке</h2>
              </div>
              <a className={'LinkCsv'} href={csvStringMaker(data_out, headers)} download={`${name}_при_вып_export.csv`}>Загрузить <Download/>
              </a>
          </div>
          {
              data_out &&
              data_out.length > 0 ?
                  <Table
                      data={data_out}
                      headers={headers}
                  />
                  :
                  <p>Загрузка .....</p>
          }
          <div className="header">
              <h2 className="Label">Статистическая диаграмма по {name}</h2>
          </div>
          <AreaDiagramm data={noValueOption(data_in)} data_2={noValueOption(data_out)} dataKey={'Value'} dataMax={300}/>
      </div>
  );
};

export default StatContainer;

