import React from 'react';
import { Typography } from '@mui/material';
import {
  DataEntityLineage,
  DataEntityLineageNode,
} from 'generated-sources';
import DialogWrapper from 'components/shared/DialogWrapper/DialogWrapper';
import { Link } from 'react-router-dom';
import { dataEntityDetailsPath } from 'lib/paths';
import AppButton from 'components/shared/AppButton/AppButton';
import * as S from './GroupedEntitiesListModalStyles';

interface GroupedEntitiesListModalProps {
  dataEntityName: string | undefined;
  entities: DataEntityLineageNode[];
  openBtnEl: JSX.Element;
  fetchMoreLineage: (
    entityId: number,
    lineageDepth: number
  ) => Promise<DataEntityLineage>;
}

const GroupedEntitiesListModal: React.FC<GroupedEntitiesListModalProps> = ({
  dataEntityName,
  entities,
  openBtnEl,
  fetchMoreLineage,
}) => {
  const [
    isLoadMoreClicked,
    setIsLoadMoreClicked,
  ] = React.useState<boolean>(false);

  const listItem = (item: DataEntityLineageNode) => (
    <Link to={dataEntityDetailsPath(item.id)}>
      <S.ListItemContainer container>
        <Typography
          noWrap
          maxWidth={450}
          title={item.internalName || item.externalName}
        >
          {item.internalName || item.externalName}
        </Typography>
        <AppButton
          color="primaryLight"
          size="medium"
          onClick={e => {
            e.preventDefault();
            fetchMoreLineage(item.id, 1);
            setIsLoadMoreClicked(true);
          }}
        >
          Load more
        </AppButton>
      </S.ListItemContainer>
    </Link>
  );

  const modalTitle = (
    <Typography variant="h4">{`Entities list of ${dataEntityName}`}</Typography>
  );

  const modalContent = () => (
    <div>
      {entities?.map((entity: DataEntityLineageNode) => (
        <div key={entity.id}>{listItem(entity)}</div>
      ))}
    </div>
  );

  return (
    <DialogWrapper
      renderOpenBtn={({ handleOpen }) =>
        React.cloneElement(openBtnEl, {
          onClick: () => {
            handleOpen();
            setIsLoadMoreClicked(false);
          },
        })
      }
      title={modalTitle}
      renderContent={modalContent}
      maxWidth="md"
      handleCloseSubmittedForm={isLoadMoreClicked}
    />
  );
};

export default GroupedEntitiesListModal;