import React from 'react';
import { connect } from 'react-redux';
import { AltCrDataTable, GPRTable } from '../../UI';
import Diagram from '../Graph/Diagram/Diagram';
import Radial from '../Graph/Radial/Radial';
import styled from 'styled-components';
import { getAHPResult } from '../../../api';
import _ from 'lodash';
import { Button } from '../../UI';
import Modal from '../../Modal';
import ModalLineGraph from '../Graph/Line/ModalLineGraph';

class AHPResult extends React.PureComponent {
  state = {
    loaded: false,
    result: {},
    hovered: {},
    showModal: false
  };
  componentDidMount = async () => {
    const { alternatives, criterias, LPRs } = this.props;
    const result = await getAHPResult({ alternatives, criterias, LPRs });

    this.setState({ loaded: true, result: result });
  };

  render() {
    const { target, purpose, alternatives, criterias, LPRs } = this.props;
    if (_.isEqual(this.state.result, {})) {
      return null;
    }
    if (this.state.result.status !== 200) {
      return <div>error</div>;
    }
    const data = this.state.result.data;
    let set = [];
    for (let i = 0; i < alternatives.length; ++i) {
      set.push(i);
    }

    return (
      <Container>
        <TextContainer>
          <TextTitle>Проект:</TextTitle>
          <Text>{target}</Text>
        </TextContainer>

        <TextContainer>
          <TextTitle>Цель:</TextTitle>
          <Text>{purpose.target}</Text>
        </TextContainer>

        <TableContainer>
          <TableLabel>Локальные приоритеты критериев и альтернатив</TableLabel>
          <AltCrDataTable alt={alternatives} cr={criterias} LPRs={LPRs} />
        </TableContainer>

        <TableContainer>
          <TableLabel>Глобальные приоритеты Альтернатив</TableLabel>
          <GPRTable
            active={this.state.hovered}
            alt={alternatives}
            output={data.output}
            outputRel={data.outputRel}
          />
        </TableContainer>
        <Button
          title={'Ценность информации'}
          disabled={false}
          click={this.openModal}
        />
        <DiagramContainer>
          <TableLabel>Диаграмма глобальных приоритетов альтернатив</TableLabel>
          <Diagram
            hover={this.handleDiagramHover}
            alt={alternatives}
            output={data.output}
            outputRel={data.outputRel}
          />
        </DiagramContainer>
        <RadialDiagramContainer>
          <RadialDiagramLabel>
            <RadialLabel>Исходное множество альтернатив</RadialLabel>
            <Radial
              alternatives={alternatives}
              criterias={criterias}
              LPRs={LPRs}
              set={set}
            />
          </RadialDiagramLabel>
          <RadialDiagramLabel>
            <RadialLabel>
              Множество оптимальных по Бартини альтернатив
            </RadialLabel>
            <Radial
              alternatives={alternatives}
              criterias={criterias}
              LPRs={LPRs}
              set={data.altSet}
            />
          </RadialDiagramLabel>
          <RadialDiagramLabel>
            <RadialLabel>
              Множество оптимальных по Слейтеру альтернатив
            </RadialLabel>
            <Radial
              alternatives={alternatives}
              criterias={criterias}
              LPRs={LPRs}
              set={data.altSlayterSet}
            />
          </RadialDiagramLabel>
          <RadialDiagramLabel>
            <RadialLabel>
              Множество оптимальных по Парето альтернатив
            </RadialLabel>
            <Radial
              alternatives={alternatives}
              criterias={criterias}
              LPRs={LPRs}
              set={data.altParetoSet}
            />
          </RadialDiagramLabel>
        </RadialDiagramContainer>
        {this.state.showModal ? (
          <Modal>
            <ModalLineGraph
              alternatives={alternatives}
              LPRs={{
                lpr: data.output,
                Korogodin: data.valuesKorogodin,
                Bongard: data.valuesBongard,
                entropyBeginning: data.entropyBeginning,
                entropyFinal: data.entropyFinal,
                deltaEntropy: data.deltaEntropy
              }}
              close={this.closeModal}
            />
          </Modal>
        ) : null}
      </Container>
    );
  }
  handleDiagramHover = (_name, value) => {
    this.setState({ hovered: value });
  };
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
}
const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 50px 10px 30px 10px;
`;
const RadialLabel = styled.div`
  display: inline-block;
  & + div {
    width: 350px;
    height: 350px;
  }
`;
const RadialDiagramLabel = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const RadialDiagramContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const DiagramContainer = styled.div`margin-bottom`;
const TextContainer = styled.div`
  margin-bottom: 30px;
`;
const TextTitle = styled.span`
  margin-right: 8px;
`;
const Text = styled.span``;
const TableLabel = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;
const mapStateToProps = state => ({
  target: state.AHP.target,
  purpose: state.AHP.purpose,
  LPRs: state.AHP.LPRs.data,
  criterias: state.AHP.criterias,
  alternatives: state.AHP.alternatives
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AHPResult);
