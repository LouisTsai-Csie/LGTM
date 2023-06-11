import { 
    Button, 
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogCloseButton
} from '@chakra-ui/react';

import { 
    Fragment, 
    useRef
} from "react";


import { useNavigate } from 'react-router-dom';

function AlertLog(props) {
    const { isOpen, onOpen, onClose, title,  content} = props;
    const cancelRef = useRef();

    const navigate = useNavigate();
  
    return (
      <Fragment>
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
        <AlertDialogOverlay />

        <AlertDialogContent>
        <AlertDialogHeader> {title} </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody> {content} </AlertDialogBody>
        <AlertDialogFooter>
        <Button ref={cancelRef} onClick={()=>{onClose(); navigate('/');}}>OK</Button>
        </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
      </Fragment>
    );
}

  export default AlertLog;