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

function AlertLog(props) {
    const { isOpen, onOpen, onClose, title,  content} = props;
    const cancelRef = useRef();
  
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
        <Button ref={cancelRef} onClick={onClose}>OK</Button>
        </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
      </Fragment>
    );
}

  export default AlertLog;