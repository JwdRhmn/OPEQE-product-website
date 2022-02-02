import React, { useState } from 'react';
import cn from "classnames";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import CreditCardIcon from "@material-ui/icons/CreditCard";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useTheme } from '@material-ui/core/styles';

import ProfilePayment from "../ProfilePayment";

export default function(props) {
	const { 
        className, 
        style,
        anchor,
        onClose,
        onLogOut,
        ...others
    } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [ dialogOpen, setDialogOpen ] = useState(false);
    function toggleDialog(){
      setDialogOpen(!dialogOpen);
      onClose();
    }

    function handleLogOut(){
        onClose();
        onLogOut();
    }


    return (
        <div 
        	className={cn(
        		'profile-menu-l1',
        		className
        	)} 
        	style={{
                ...style 
            }}
            {...others}
        >
            <Menu
                id="customized-menu"
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={onClose}
            >
                <MenuItem onClick={toggleDialog}>
                    <ListItemIcon>
                        <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Payment Methods" />
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Log Out" 
                    />
                </MenuItem>
            </Menu>
            <Dialog 
              PaperProps={{
                style:{
                  padding: fullScreen ? '0' : '15px',
                }
              }}
              open={dialogOpen}
              onClose={toggleDialog}
              fullScreen={fullScreen}
              fullWidth
            >
              <DialogContent>
                <ProfilePayment onClose={toggleDialog} />
              </DialogContent>
            </Dialog>
        </div>
    );
}


