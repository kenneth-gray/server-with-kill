import { Server, Socket } from 'net';

export type ServerWithKill = Server & {
  kill: (callback?: (error?: Error) => void) => ServerWithKill;
};

export function transform(server: Server) {
  let killCalled = false;
  const serverWithKill: ServerWithKill = server as any;

  let connections: Socket[] = [];
  serverWithKill.on('connection', currentConnection => {
    if (killCalled) {
      currentConnection.destroy();
      return;
    }

    connections.push(currentConnection);

    currentConnection.on('close', () => {
      connections = connections.filter(
        connection => connection !== currentConnection,
      );
    });
  });

  serverWithKill.kill = (callback?: (error?: Error) => void) => {
    killCalled = true;
    connections.forEach(connection => {
      connection.destroy();
    });

    return serverWithKill.close(callback);
  };

  return serverWithKill;
}
