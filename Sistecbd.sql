CREATE DATABASE hotel_db;
-- Crear tabla de Habitaciones
USE hotel_db;
CREATE TABLE Habitaciones (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  NumeroHabitacion VARCHAR(50) NOT NULL,
  Estado ENUM('ocupada', 'disponible') NOT NULL DEFAULT 'disponible'
);

-- Crear tabla de Huéspedes
CREATE TABLE Huespedes (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Identificacion VARCHAR(20) NOT NULL,
  FechaHoraIngreso DATETIME NOT NULL,
  FechaHoraSalida DATETIME NOT NULL,
  ID_Habitacion INT,
  FOREIGN KEY (ID_Habitacion) REFERENCES Habitaciones(ID)
);

INSERT INTO Habitaciones (NumeroHabitacion, Estado) VALUES
  ('101', 'disponible'),
  ('102', 'ocupada'),
  ('103', 'disponible'),
  ('104', 'disponible');
