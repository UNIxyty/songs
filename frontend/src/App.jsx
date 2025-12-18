import { useState, useEffect } from 'react';
import { getSongs, updateSongStatus } from './api/songs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './components/ui/table';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchSongs();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchSongs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSongs = async () => {
    try {
      const data = await getSongs();
      setSongs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdating(id);
    try {
      const updatedSong = await updateSongStatus(id, status);
      setSongs(songs.map(song => song.id === id ? updatedSong : song));
    } catch (error) {
      console.error('Error updating song:', error);
      alert('Failed to update song status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'Declined':
        return 'destructive';
      case 'About to Play':
        return 'secondary';
      case 'Saved':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status) => {
    if (!status || status === 'null') return 'Pending';
    return status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">DJ Song Requests</CardTitle>
            <CardDescription>
              Manage song requests from your Telegram bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading songs...</div>
            ) : songs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No song requests yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Song</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {songs.map((song) => (
                    <TableRow key={song.id}>
                      <TableCell className="font-medium">
                        {song['song - name'] || song['song-name'] || 'N/A'}
                      </TableCell>
                      <TableCell>{song.artist || 'N/A'}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {song.user_id || 'N/A'}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {song.link ? (
                          <a 
                            href={song.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {song.link.length > 30 ? song.link.substring(0, 30) + '...' : song.link}
                          </a>
                        ) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(song.status)}>
                          {getStatusLabel(song.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(song.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant={song.status === 'Approved' ? 'default' : 'outline'}
                            onClick={() => handleStatusUpdate(song.id, 'Approved')}
                            disabled={updating === song.id}
                          >
                            {updating === song.id ? '...' : 'Approve'}
                          </Button>
                          <Button
                            size="sm"
                            variant={song.status === 'Declined' ? 'destructive' : 'outline'}
                            onClick={() => handleStatusUpdate(song.id, 'Declined')}
                            disabled={updating === song.id}
                          >
                            {updating === song.id ? '...' : 'Decline'}
                          </Button>
                          <Button
                            size="sm"
                            variant={song.status === 'About to Play' ? 'secondary' : 'outline'}
                            onClick={() => handleStatusUpdate(song.id, 'About to Play')}
                            disabled={updating === song.id}
                          >
                            {updating === song.id ? '...' : 'About to Play'}
                          </Button>
                          <Button
                            size="sm"
                            variant={song.status === 'Saved' ? 'secondary' : 'outline'}
                            onClick={() => handleStatusUpdate(song.id, 'Saved')}
                            disabled={updating === song.id}
                          >
                            {updating === song.id ? '...' : 'Saved'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

