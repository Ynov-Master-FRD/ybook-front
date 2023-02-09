import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    wrapper: {
      height: '100vh',
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1596468138838-0f34c2d0773b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8)',
    },
  
    form: {
      height: '100%',
      maxWidth: 'clamp(300px, 35%, 100%)',
      paddingTop: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(10px)',
    },
  
    title: {
      color: 'dark',
    },
  }));