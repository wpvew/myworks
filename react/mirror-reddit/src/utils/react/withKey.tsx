function withKey(key?: string) {
  return <E, T extends React.ComponentType<E>>(component: T) =>
    // eslint-disable-next-line react/display-name
    (props: E, index: number) =>
      React.createElement(component, { ...props, N: key ? props[key as keyof E] : index }, []);
}
