import {
  buttonBaseClasses,
  CSSObject,
  Tab,
  tabClasses,
  TabProps,
} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { propsChecker } from 'lib/helpers';
import { TabType } from 'components/shared/AppTabs/interfaces';
import React from 'react';
import { LinkProps } from 'react-router-dom';

const LinkTab: React.ComponentType<
  Omit<TabProps, 'children'> & Omit<LinkProps, 'children'>
> = Tab as React.ComponentType<
  Omit<TabProps, 'children'> & Omit<LinkProps, 'children'>
>;

const getTabStylesByType = (
  theme: Theme,
  type: TabType,
  $hidden?: boolean
): CSSObject => {
  switch (type) {
    case 'primary':
      return {
        minHeight: '32px',
        padding: theme.spacing(0.75, 1),
        lineHeight: 1,
        minWidth: 'auto',
        opacity: 1,
        borderBottom: '1px solid transparent',
        marginRight: theme.spacing(0.5),
        '&:last-child': { marginRight: 0 },
        display: $hidden ? 'none' : 'block',
        '&:hover': {
          color: theme.palette.texts.info,
          borderColor: theme.palette.button?.secondary.hover.background,
        },
      };
    case 'secondary':
      return {
        minHeight: '24px',
        minWidth: '91px',
        padding: theme.spacing(0.25),
        '&:hover': { color: theme.palette.texts.primary },
      };
    case 'secondarySmall':
      return {
        minHeight: '24px',
        minWidth: '44px',
        padding: theme.spacing(0.25, 1.5),
        '&:hover': { color: theme.palette.texts.primary },
      };
    case 'menu':
      return {
        [`&.${tabClasses.root}`]: {
          alignItems: 'flex-start',
        },
        minWidth: '65px',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        minHeight: '32px',
        marginRight: theme.spacing(0.5),
        '&:last-child': { marginRight: 0 },
        '&:hover': {
          color: theme.palette.texts.secondary,
          backgroundColor: theme.palette.backgrounds.primary,
        },
      };
    default:
      return {};
  }
};

const getSelectedTabStylesByType = (
  theme: Theme,
  type: TabType
): CSSObject => {
  switch (type) {
    case 'primary':
      return {};
    case 'secondary':
      return {
        height: '24px',
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.spacing(0.5),
      };
    case 'secondarySmall':
      return {
        color: theme.palette.texts.info,
        height: '24px',
        backgroundColor: theme.palette.background.default,
        border: '1px solid',
        borderColor: theme.palette.info.light,
        borderRadius: theme.spacing(2),
      };
    case 'menu':
      return {
        color: theme.palette.texts.primary,
        backgroundColor: theme.palette.backgrounds.secondary,
      };
    default:
      return {};
  }
};

const tabStyles = (
  theme: Theme,
  type: TabType,
  $hidden?: boolean
): CSSObject => ({
  [`&.${buttonBaseClasses.root}`]: {
    [`&.${tabClasses.root}`]: {
      alignItems: 'center',
    },
  },
  [`&.${tabClasses.selected}`]: {
    color: theme.palette.texts.primary,
    ...getSelectedTabStylesByType(theme, type),
    alignItems: 'center',
  },

  padding: theme.spacing(0.75, 1.5),
  color: theme.palette.texts.secondary,
  fontSize: theme.typography.body1.fontSize,
  textTransform: 'none',
  ...getTabStylesByType(theme, type, $hidden),
});

export const TabContainer = styled(Tab, {
  shouldForwardProp: propsChecker,
})<{ $type: TabType; $hidden?: boolean }>(({ theme, $type, $hidden }) =>
  tabStyles(theme, $type, $hidden)
);

export const LinkTabContainer = styled(LinkTab, {
  shouldForwardProp: propsChecker,
})<{ $type: TabType; $hidden?: boolean }>(({ theme, $type, $hidden }) =>
  tabStyles(theme, $type, $hidden)
);